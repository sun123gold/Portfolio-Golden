import { z } from "zod";
import prisma from "../lib/prisma.js";
import { Resend } from "resend";

// Resend email client
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form validation
const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email address"),

    subject: z
        .string()
        .trim()
        .min(3, "Subject must be at least 3 characters")
        .max(150, "Subject is too long"),

    message: z
        .string()
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message is too long"),
});

// Create contact message
export const createContactMessage = async (req, res, next) => {
    try {
        // 1. Validate incoming data
        const result = contactSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Please check the information you provided.",
                errors: result.error.flatten().fieldErrors,
            });
        }

        const { name, email, subject, message } = result.data;

        // 2. Save message to PostgreSQL
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        // 3. Send email notification
        try {
            await resend.emails.send({
                from: "Portfolio <onboarding@resend.dev>",
                to: process.env.CONTACT_EMAIL,
                subject: `New Portfolio Contact: ${subject}`,
                text: `
                You received a new message through your portfolio website.

                Name: ${name}
                Email: ${email}
                Subject: ${subject}

            Message:
            ${message}

            Message ID: ${contactMessage.id}
        `,
            });
        } catch (emailError) {
            // The message is already safely stored in the database.
            console.error("Email notification failed:", emailError);
        }

        // 4. Send success response to frontend
        return res.status(201).json({
            success: true,
            message: "Your message has been sent successfully.",
            data: {
                id: contactMessage.id,
            },
        });
    } catch (error) {
        next(error);
    }
};