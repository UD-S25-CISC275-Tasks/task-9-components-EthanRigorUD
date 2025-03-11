import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {
    const [qType, setQType] = useState<QuestionType>("short_answer_question");
    const TO_AND_FRO: Record<QuestionType, QuestionType> = {
        short_answer_question: "multiple_choice_question",
        multiple_choice_question: "short_answer_question"
    };
    const qTypeParser: Record<QuestionType, string> = {
        short_answer_question: "Short Answer",
        multiple_choice_question: "Multiple Choice"
    };
    const qTypeString: string = qTypeParser[qType];

    return (
        <div>
            <Button
                onClick={() => {
                    setQType(TO_AND_FRO[qType]);
                }}
            >
                Change Type
            </Button>
            <div> {qTypeString} </div>
        </div>
    );
}
