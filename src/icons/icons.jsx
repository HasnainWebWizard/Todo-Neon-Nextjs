
export function DustBinIcon() {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-red-400 font-bold cursor-pointer"
            >
                <rect x="6" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M9 4h6M10 4V2h4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" />
                <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" />
            </svg>
        </>
    );
}

export function EditIcon() {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-black font-bold cursor-pointer"
            >
                <path
                    d="M4 20h4.5l10-10.5a1.5 1.5 0 0 0-2.1-2.1L6.5 17.9V20z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />
                <path
                    d="M14.5 6.5l3 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </>
    );
}