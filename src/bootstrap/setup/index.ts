import { httpSetup } from './http.setup'
import { logSetup } from './log.setup'
import { libSetup } from './lib.setup'

export default async function () {
    await logSetup()
    await httpSetup()
    await libSetup()
}
