import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PRICE_CHILD_ARRAY } from '@/constant';

function SelectChildPeople({
    amount,
    placeholder,
    value,
    onChange,
    onRemove,
    usedPrices = [],
}: {
    amount: number;
    placeholder: string;
    value: { number: number; price: number };
    onChange: (val: { number: number; price: number }) => void;
    onRemove?: () => void;
    usedPrices?: number[];
}) {
    return (
        <>
            <div className="grid grid-cols-5 items-center gap-2">
                <div className="col-span-2">
                    <Select
                        value={value.number.toString()}
                        onValueChange={val =>
                            onChange({ ...value, number: Number(val) })
                        }
                    >
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Array.from({ length: amount }, (_, i) => (
                                    <SelectItem
                                        key={i + 1}
                                        value={(i + 1).toString()}
                                    >
                                        {i + 1}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="col-span-2">
                    <Select
                        value={value.price.toString()}
                        onValueChange={val =>
                            onChange({ ...value, price: Number(val) })
                        }
                    >
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="ระบุราคา" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {PRICE_CHILD_ARRAY.filter(
                                    item => !usedPrices.includes(item.price)
                                ).map(item => (
                                    <SelectItem
                                        key={item.price}
                                        value={item.price.toString()}
                                    >
                                        {item.price} บาท
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {onRemove && (
                    <button
                        type="button"
                        className="text-xs text-red-500 hover:underline"
                        onClick={onRemove}
                    >
                        ลบ
                    </button>
                )}
            </div>
        </>
    );
}

export default SelectChildPeople;
