import React from 'react';
import SelectAdultPeople from './SelectAdultPeople';
import SelectChildPeople from './SelectChildPeople';
import { toast } from 'sonner';

type SelectedPeopleProps = {
    adult: number;
    child: {
        number: number;
        price: number;
    }[];
    adultMax: number;
    childMax: number;
    setAdult: (adult: number) => void;
    setChild: (
        child: {
            number: number;
            price: number;
        }[]
    ) => void;
    disabled?: boolean;
    isAllTablesSelected?: boolean;
};

function SelectedPeople({
    adult,
    child,
    adultMax,
    childMax,
    setAdult,
    setChild,
    disabled = false,
    isAllTablesSelected = false,
}: SelectedPeopleProps) {
    const totalChildCount = child.reduce((sum, item) => sum + item.number, 0);

    // เช็คว่าเพิ่มแถวใหม่ได้ไหม
    const canAddChild =
        child.length < childMax && totalChildCount < childMax && childMax > 0;

    const handleAddChild = () => {
        if (canAddChild) {
            setChild([...child, { number: 1, price: 0 }]);
        }
    };

    const handleUpdateChild = (
        index: number,
        updated: { number: number; price: number }
    ) => {
        const tempList = [...child];
        tempList[index] = updated;

        // รวมจำนวนเด็กใหม่
        const newTotal = tempList.reduce((sum, item) => sum + item.number, 0);

        // รวมจำนวนเด็กต่อราคาใหม่
        const newPriceMap = new Map<number, number>();
        tempList.forEach(({ number, price }) => {
            newPriceMap.set(price, (newPriceMap.get(price) || 0) + number);
        });

        // ตรวจสอบว่ารวมเด็ก และ เด็กต่อราคาทุกอัน ไม่เกิน childMax
        const isValid =
            newTotal <= childMax &&
            [...newPriceMap.values()].every(count => count <= childMax);

        if (isValid) {
            setChild(tempList);
        } else {
            toast.error('จำนวนเด็กเกินกว่าที่มีอยู่');
        }
    };

    const handleRemoveChild = (index: number) => {
        const newChild = [...child];
        newChild.splice(index, 1);
        setChild(newChild);
    };

    const selectedPrices = child.map(c => c.price);

    return (
        <div className="space-y-4">
            {/* ผู้ใหญ่ */}
            <SelectAdultPeople
                amount={adultMax}
                placeholder="จำนวนผู้ใหญ่"
                setValue={setAdult}
                disabled={disabled || adultMax === 0}
                value={adult}
            />

            {/* เด็กหลายแถว */}
            {child.map((item, index) => (
                <SelectChildPeople
                    key={index}
                    amount={childMax - child.length + 1}
                    placeholder="จำนวนเด็ก"
                    value={item}
                    usedPrices={selectedPrices.filter((_, i) => i !== index)}
                    onChange={updated => handleUpdateChild(index, updated)}
                    onRemove={() => handleRemoveChild(index)}
                />
            ))}

            {/* ปุ่มเพิ่ม */}
            {canAddChild && (
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="rounded-md border px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
                        onClick={handleAddChild}
                    >
                        + เพิ่มเด็ก
                    </button>

                    {isAllTablesSelected && (
                        <div className="text-right text-xs text-red-500">
                            กรุณาเลือกจำนวนและราคาของเด็ก
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SelectedPeople;
