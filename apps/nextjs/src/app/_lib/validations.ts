import { MB_BYTES } from "./constants";

// Zod validation constants
export const INVALID_EMAIL = "Неправильний E-mail";
export const INVALID_PASSWORD = "Неправильний пароль";
export const INVALID_PHONE = "Перевірте правельність номеру телефону";
export const INVALID_PHONE_STARTS_FROM_ZERO =
  "Телефон не може починатися з нуля, перевірте правильність вводу";
export const INVALID_CONFIRM_PASSWORD = "Паролі не співпадають";
export const INVALID_IMAGE_MIME_TYPES =
  "Підтримуються тільки наступні формати зображення .jpg, .jpeg, .png та .webp.";
export const INVALID_IMAGE_SIZE = `Файл завеликий. Завантажте зображення до ${MB_BYTES}Mb`;

export const REQUIRED_NAME = "Введіть ваше ім'я";
export const REQUIRED_EMAIL = "Введіть ваш E-mail";
export const REQUIRED_PHONE = "Введіть ваш номер телефону";
export const REQUIRED_PASSWORD = "Пароль має бути довжиною мінімум 8 символів";
export const REQUIRED_FILE = "Завантажте файл";

export const PHONE_REGEX = /^(\+380) \(\d{2}\) \d{3}\-\d{4}$/;
export const PHONE_REGEX_STARTS_FROM_ZERO = /^(\+380) \([^0].*$/;
