import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday =
    | "Birthday"
    | "Halloween"
    | "Thanksgiving"
    | "Christmas"
    | "Valentines";

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("Birthday");

    const toEmoji: Record<Holiday, string> = {
        Birthday: "🥳",
        Halloween: "🎃",
        Thanksgiving: "🦃",
        Christmas: "🎅",
        Valentines: "♥️"
    };
    const toNextAlphabet: Record<Holiday, Holiday> = {
        Birthday: "Christmas",
        Halloween: "Thanksgiving",
        Thanksgiving: "Valentines",
        Christmas: "Halloween",
        Valentines: "Birthday"
    };
    const toNextTemporal: Record<Holiday, Holiday> = {
        Birthday: "Halloween",
        Halloween: "Thanksgiving",
        Thanksgiving: "Christmas",
        Christmas: "Valentines",
        Valentines: "Birthday"
    };
    return (
        <div>
            <Button
                onClick={() => {
                    setHoliday(toNextAlphabet[holiday]);
                }}
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() => {
                    setHoliday(toNextTemporal[holiday]);
                }}
            >
                Advance by Year
            </Button>
            Holiday: <span>{toEmoji[holiday]}</span>
        </div>
    );
}
