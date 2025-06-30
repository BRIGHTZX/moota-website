function TextInfo({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center">
            <p className="text-lg font-bold">{label}</p>
            <p className="ml-4">{value}</p>
        </div>
    );
}

export default TextInfo;
