import { reactive } from 'vue';

type Callback = (data: any) => void;

interface EventBus {
    events: Record<string, Callback[]>;

    on(event: string, callback: Callback): void;
    off(event: string, callback: Callback): void;
    emit(event: string, data: any): void;
}

const eventBus = reactive<EventBus>({
    events: {},

    on(event: string, callback: Callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },

    off(event: string, callback: Callback) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(cb => cb !== callback);
    },

    emit(event: string, data: any) {
        if (!this.events[event]) return;

        this.events[event].forEach(callback => callback(data));
    }
});

export default eventBus;
