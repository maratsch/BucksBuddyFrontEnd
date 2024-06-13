import axios from 'axios';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import JourneyCard from '@/components/expenses/JourneyCard.vue';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock Axios mit Vitest
vi.mock('axios', () => ({
    get: vi.fn(() => Promise.resolve({ data: { id: 1, name: 'Urlaub in Berlin', budget: 1000, currency: 'EUR' }})),
    delete: vi.fn(() => Promise.resolve({ data: { message: 'Deleted successfully' } }))
}));

describe('JourneyCard', () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        const journey = {
            id: 1,
            name: 'Urlaub in Berlin',
            budget: 1000,
            currency: 'EUR'
        };

        // Mounte die Komponente
        wrapper = shallowMount(JourneyCard, {
            props: { journey }
        });
    });

    it('shows the journey details correctly', async () => {
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Urlaub in Berlin');
        expect(wrapper.text()).toContain('1000 EUR');
    });

    it('can delete a journey', async () => {
        // Führe deleteJourney Methode aus
        await wrapper.vm.deleteJourney(1);

        // Assertions
        expect(axios.delete).toHaveBeenCalledWith(expect.any(String));
        expect(wrapper.emitted('deleted')).toBeTruthy();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });
});
