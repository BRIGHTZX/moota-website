import ChartLineLabel from "@/components/charts/LineChartLabel";
import { useGetTotalCustomer } from "../api/use-get-total-customer";
import { DateModeType, TotalCustomerType } from "../types";

type CustomerSectionProps = {
    startDate: string;
    endDate: string;
    mode: DateModeType;
};

function CustomerSection({ startDate, endDate, mode }: CustomerSectionProps) {
    const { data } = useGetTotalCustomer(startDate, endDate, mode);
    return (
        <ChartLineLabel<TotalCustomerType>
            title="จำนวนลูกค้า"
            data={data as TotalCustomerType[]}
            startDate={startDate}
            endDate={endDate}
            config={{
                total: {
                    label: "จำนวนลูกค้า",
                    key: "total",
                    color: "#2C7FFF",
                },
            }}
        />
    );
}

export default CustomerSection;
