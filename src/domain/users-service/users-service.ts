
import {usersDbType} from '../../types/usersTypes'
import bcrypt from 'bcrypt'
import { usersRepository } from '../../repositories/users-repository/users-repository'
export const usersService = {

    async findAllUsers(): Promise<usersDbType[]>{
        return await usersRepository.findAllUsers()
    },

    async createUser(login: string, email: string, password: string): Promise<usersDbType>{

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const createdat = new Date()

        const newUser: usersDbType = {
            id: Math.floor(Math.random()* 10000).toString(),
            login: login,
            email: email,
            createdAt: createdat.toISOString(),
            passwordHash: passwordHash,
            passwordSalt: passwordSalt
        }
        const createdUser = usersRepository.createUser(newUser)
        return createdUser

    },
    async deleteUser(id: string): Promise<boolean>{
        return await usersRepository.deleteUser(id)
    },

    async checkCredantials(loginOrEmail: string, password: string){
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash){
            return false
        } return true
    },

    async _generateHash(password: string, salt: string){
        const hash = await bcrypt.hash(password, salt)
        return hash
    }



}   