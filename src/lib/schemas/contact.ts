import { z } from "zod";

const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;
const NAME_REGEX = /^[\p{L}\s'\-]{2,80}$/u;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre no puede superar 80 caracteres")
    .regex(NAME_REGEX, "El nombre contiene caracteres no válidos")
    .transform((val) => val.trim()),

  phone: z
    .string()
    .regex(PHONE_REGEX, "Número de teléfono no válido")
    .optional()
    .or(z.literal("")),

  service: z.enum(["guitar", "ukulele", "singing", "languages", "other"], {
    errorMap: () => ({ message: "Selecciona un servicio válido" }),
  }),

  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede superar 500 caracteres")
    .transform((val) => val.trim()),

  lang: z.enum(["es", "en"]).default("es"),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactOutput = z.output<typeof contactSchema>;

export function validateContact(data: unknown): {
  success: boolean;
  data?: ContactOutput;
  errors?: Record<string, string[]>;
} {
  const result = contactSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string[]> = {};
  for (const issue of result.error.issues) {
    const field = issue.path.join(".") || "general";
    if (!errors[field]) errors[field] = [];
    errors[field]!.push(issue.message);
  }

  return { success: false, errors };
}
