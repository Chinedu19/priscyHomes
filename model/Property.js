const prisma = require('../database/prisma')

// Code(Methods) to go through everything relating to Properties

class Property {

    static async create(data) {
        const property = await prisma.properties.create({
            data
        })

        return property
    }

    static async delete(id) {
        try {
            const deletedProperty = await prisma.properties.delete({
                where: { id }
            })

            return deletedProperty
        } catch(err) {
            throw new Error(`Error deleting user. Try again. -- Error: ${err.message}`)
        }
    }

    static async update(params) {
        try {
            const updatedProperties = await prisma.properties.update({
                where: params.where,
                data: params.data
            })

            return updatedProperties
        } catch(err) {
            throw new Error(`Cannot update user. Try again. -- Error: ${err.message}`)
        }
    }

    static async getProperty(filter) {
        const property = await prisma.properties.findFirst({
            where: filter
        })

        return property
    }
    static async searchProperty(filter) {
        const property = await prisma.properties.findMany({
            where: filter
        })

        return property
    }

    static async getAllProperties() {
        const properties = await prisma.properties.findMany()
        return properties
    }

    static async exists(email) {
        const properties = await prisma.properties.findUnique({
            where: { email }
        })

        return !!properties
    }
}

module.exports = Property