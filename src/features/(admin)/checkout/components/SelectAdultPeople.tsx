import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

function SelectAdultPeople({
    amount,
    placeholder,
    value,
    setValue,
    disabled = false,
}: {
    amount: number;
    placeholder: string;
    value: number;
    setValue: (value: number) => void;
    disabled?: boolean;
}) {
    const valueString = value > 0 ? value.toString() : '';
    return (
        <Select
            value={valueString}
            onValueChange={value => setValue(Number(value))}
            disabled={disabled}
        >
            <SelectTrigger className="w-full bg-white" disabled={disabled}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Array.from({ length: amount }, (_, i) => {
                        const value = (i + 1).toString();
                        return (
                            <SelectItem key={value} value={value}>
                                {i + 1}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SelectAdultPeople;
