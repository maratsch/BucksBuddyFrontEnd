import { mount } from '@vue/test-utils';
import JourneyCard from '@/components/expenses/JourneyCard.vue';
import axios from 'axios';

jest.mock('axios');

describe('JourneyCard', () => {
    let wrapper;

    beforeEach(() => {
        // Mock-Daten für die Tests
        const journey = {
            id: 1,
            name: 'Urlaub in Berlin',
            budget: 1000,
            currency: 'EUR'
        };

        // Mock für axios.get
        axios.get.mockResolvedValue({ data: journey });

        wrapper = shallowMount(JourneyCard, {
            propsData: { journey }
        });
    });

    it('zeigt die Journey-Details korrekt an', () => {
        expect(wrapper.text()).toContain('Urlaub in Berlin');
        expect(wrapper.text()).toContain('1000 EUR');
    });

    it('kann eine Reise löschen', async () => {
        axios.delete.mockResolvedValue();

        // Annahme, dass eine Methode deleteJourney existiert, die axios.delete aufruft
        await wrapper.vm.deleteJourney(1);

        expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('1'));
        // Überprüfen, ob nach dem Löschen eine bestimmte Aktion erfolgt, z.B. ein Event emit
        expect(wrapper.emitted('deleted')).toBeTruthy();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});