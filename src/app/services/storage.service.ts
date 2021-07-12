import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    save(key: string, val: any) {
        localStorage.setItem(key, JSON.stringify(val, null, 2));
    }

    load(key: string) {
        const val = localStorage.getItem(key)
        return JSON.parse(val)
    }
}
