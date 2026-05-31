import { describe, it, expect } from "vitest";
import { validateContact } from "@/lib/schemas/contact";

describe("contactSchema", () => {
  it("accepts valid input", () => {
    const result = validateContact({
      name: "María González",
      service: "guitar",
      message: "Quiero más información sobre clases de guitarra.",
      lang: "es",
    });
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("María González");
  });

  it("rejects name shorter than 2 chars", () => {
    const result = validateContact({
      name: "A",
      service: "guitar",
      message: "Mensaje de prueba aquí.",
      lang: "es",
    });
    expect(result.success).toBe(false);
    expect(result.errors?.name).toBeDefined();
  });

  it("rejects invalid service", () => {
    const result = validateContact({
      name: "Pedro López",
      service: "drums",
      message: "Quiero clases de batería.",
      lang: "es",
    });
    expect(result.success).toBe(false);
    expect(result.errors?.service).toBeDefined();
  });

  it("rejects message shorter than 10 chars", () => {
    const result = validateContact({
      name: "Juan Mora",
      service: "singing",
      message: "Hola",
      lang: "es",
    });
    expect(result.success).toBe(false);
    expect(result.errors?.message).toBeDefined();
  });

  it("trims whitespace from name and message", () => {
    const result = validateContact({
      name: "  Ana Vargas  ",
      service: "languages",
      message: "  Me interesa aprender inglés desde cero.  ",
      lang: "en",
    });
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("Ana Vargas");
    expect(result.data?.message).toBe("Me interesa aprender inglés desde cero.");
  });

  it("accepts valid phone number", () => {
    const result = validateContact({
      name: "Luis Méndez",
      phone: "+50689215848",
      service: "ukulele",
      message: "Consulta sobre el precio de las clases.",
      lang: "es",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid phone number", () => {
    const result = validateContact({
      name: "Luis Méndez",
      phone: "not-a-phone",
      service: "ukulele",
      message: "Consulta sobre el precio de las clases.",
      lang: "es",
    });
    expect(result.success).toBe(false);
    expect(result.errors?.phone).toBeDefined();
  });
});
