import { z } from 'zod';

export const formSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  availableTime: z.string().min(2, { message: 'Please specify available time.' }),
  transportationPreferences: z.string(),
  personalInterests: z.string().min(10, { message: 'Tell us a bit more about your interests (at least 10 characters).' }),
  budgetLimit: z.string().optional(),
});
