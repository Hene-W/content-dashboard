import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'

export const loginService = async (email: string, password: string): Promise<{token: string, user: object}> => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('User not found')
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

    const { password: _, ...userWithoutPassword } = user.toObject()
    return { token, user: userWithoutPassword }
}

export const updateEmail = async (userId: string, newEmail: string): Promise<boolean> => {
    const user = await User.findByIdAndUpdate(userId, {email: newEmail}, {new: true})
    if (!user) {
        throw new Error('User not found')
    }

    return true
}

export const changePassword = async (userId: string, oldPassword: string, newPassord: string): Promise<boolean> => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error('User not found')
    }

    const isPasswordValid = await bcryptjs.compare(oldPassword, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }

    const hashedPassword = await bcryptjs.hash(newPassord, 10)
    user.password = hashedPassword
    await user.save()

    return true
}