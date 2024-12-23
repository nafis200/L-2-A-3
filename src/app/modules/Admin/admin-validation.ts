
import { z } from 'zod';

const userAdminSchema = z.object({
  isBlocked: z.boolean(),
})


export const AdminValidationSchema = {
    userAdminSchema
  };