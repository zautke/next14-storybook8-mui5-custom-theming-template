import { User } from './User'

export interface wsMessageDTO {
	user: User
	message: string
	room: string
}
