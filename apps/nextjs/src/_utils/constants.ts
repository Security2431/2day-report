import { Role } from "@acme/db";

export const NO_AVATAR_IMG =
  "https://firebasestorage.googleapis.com/v0/b/kittie-tech.appspot.com/o/avatars%2Fno-avatar.svg?alt=media&token=f97c0874-15b4-4dd9-a194-f16875d10817";

// File validation constants
export const MB_BYTES = 5; // Allowed file size in MB
export const MAX_FILE_SIZE = 1000000 * MB_BYTES;
// This is the list of mime types you will accept with the schema
export const ACCEPTED_MIME_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const MOOD_LIST = [
  { title: "calm", unified: "1f60c" },
  { title: "happy", unified: "1f642" },
  { title: "excited", unified: "1f917" },
  { title: "celebratory", unified: "1f929" },
  { title: "joyful", unified: "1f602" },
  { title: "confident", unified: "1f60e" },
  { title: "focused", unified: "1f9d0" },
  { title: "goofy", unified: "1f92a" },
  { title: "nerdy", unified: "1f913" },
  { title: "thoughtful", unified: "1f914" },
  { title: "meh", unified: "1f610" },
  { title: "confused", unified: "1f615" },
  { title: "frustrated", unified: "1f633" },
  { title: "surprised", unified: "1f632" },
  { title: "tired", unified: "1f634" },
  { title: "disappointed", unified: "1f641" },
  { title: "worried", unified: "1f627" },
  { title: "annoyed", unified: "1f644" },
  { title: "stressed", unified: "1f92f" },
  { title: "angry", unified: "1f620" },
  { title: "sick", unified: "1f912" },
];

export const PERMISSION_LIST = [
  {
    name: "Viewer",
    description: "Can view and comment.",
    role: Role.VIEWER,
  },
  {
    name: "Developer",
    description: "Can view, comment and edit.",
    role: Role.DEVELOPER,
  },
  {
    name: "Billing",
    description: "Can view, comment and manage billing.",
    role: Role.BILLING,
  },
  {
    name: "Owner",
    description: "Admin-level access to all resources.",
    role: Role.OWNER,
  },
];
