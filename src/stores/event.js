
import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
        alert: false,
        data: {}
        }
    ),
    actions: {
        popUpMessage(message, status) {
            this.alert = true;
            this.data = {
                message: message,
                status: status,
            };
            setTimeout(() => {
                this.clearAlert();
            }, 3000);
        },
        clearAlert() {
            this.alert = false;
            this.data = {};
        }
    },
});

