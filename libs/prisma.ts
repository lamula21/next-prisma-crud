// Connection to Database File
// Note: npx migrate installs a module called "PrismaClient" that allows to connect to the Database

import { PrismaClient } from '@prisma/client'

declare global {
	var prisma: PrismaClient | undefined
}

// Note: In development mode, Nextjs will create unnecessary connection
export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE !== 'production') global.prisma = prisma
