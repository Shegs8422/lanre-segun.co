export const useLayout = () => {
    const isDockVisible = useState('isDockVisible', () => true)

    return {
        isDockVisible
    }
}
