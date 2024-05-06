export enum EnumStatus {
    REST = 'REST.',
    WORK = 'WORK!',
    SUCCSESS = 'SUCCSESS'
}

export interface ITimer {
    isStarting: boolean,
    status: EnumStatus,
    currentSession: number,
    duration: number,
    key: number
}