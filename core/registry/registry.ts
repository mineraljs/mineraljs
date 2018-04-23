import { Service, InvalidServiceError } from '.'

export class Registry {

    register(service) {
        if (!this.validateService(service)) {
            throw new InvalidServiceError(service.name)
        }
    
        
    }

    unregister(id) {

    }

    private validateService(service: Service): boolean {
        return (
            service.name !== null &&
            service.healthUrl !== null &&
            service.port > 0 &&
            service.url !== null
        )
    }


}
