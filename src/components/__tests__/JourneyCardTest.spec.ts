import axios from 'axios';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import JourneyCard from '@/components/expenses/JourneyCard.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Axios mit Vitest
vi.mock('axios');

// Nutze einen Cast zu vi.Mocked, um korrekt zu typisieren
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('JourneyCard', () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        const journey = {
            id: 1,
            name: 'Urlaub in Berlin',
            budget: 1000,
            currency: 'EUR'
        };

        // Setze den Mock für axios.get
        mockedAxios.get.mockResolvedValue({ data: journey });

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
        // Mock die DELETE Anfrage
        mockedAxios.delete.mockResolvedValue({
            data: { message: 'Deleted successfully' }
        });

        // Führe deleteJourney Methode aus
        await wrapper.vm.deleteJourney(1);

        // Assertions
        expect(mockedAxios.delete).toHaveBeenCalledWith(expect.any(String));
        expect(wrapper.emitted('deleted')).toBeTruthy();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
});
