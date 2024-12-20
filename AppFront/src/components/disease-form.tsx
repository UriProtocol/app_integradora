import { Checkbox, Input } from "@nextui-org/react";
import { Disease } from "@/types/medical-history";

//@ts-ignore
interface DiseaseRowProps {
    name: string;
    disease: Disease;
    onChange: (name: string, updates: Partial<Disease>) => void;
}

function DiseaseRow({ name, disease, onChange }: any) {
    return (
        <div className="grid grid-cols-[2fr_1fr_2fr] gap-4 items-center">
            <span className="text-sm">{name}</span>
            <Checkbox
                isSelected={disease.hasSuffered}
                onValueChange={(checked) => onChange(name, { hasSuffered: checked })}
                classNames={{
                    base: "w-full",
                    wrapper: "w-5 h-5",
                }}
            >
                {disease.hasSuffered ? "Sí" : "No"}
            </Checkbox>
            <Input
                size="sm"
                placeholder="Tratamiento"
                value={disease.treatment}
                onChange={(e) => onChange(name, { treatment: e.target.value })}
                isDisabled={!disease.hasSuffered}
                classNames={{
                    base: "w-full",
                    input: "h-10",
                }}
            />
        </div>
    );
}

interface DiseaseFormProps {
    diseases: { [key: string]: Disease };
    onChange: (name: string, updates: Partial<Disease>) => void;
    onOtherDiseasesChange: (value: string) => void;
    otherDiseases: string;
}

export function DiseaseForm({
    diseases,
    onChange,
    onOtherDiseasesChange,
    otherDiseases
}: DiseaseFormProps) {
    const leftColumnDiseases = [
        "Epilepsia o Convulsiones",
        "Anemia",
        "Hiper o Hipotiroidismo",
        "Infarto al miocardio",
        "Asma",
        "Insuficiencia renal",
        "H.I.V. / SIDA",
        "Embarazo",
        "Cáncer"
    ];

    const rightColumnDiseases = [
        "Diabetes",
        "Hepatitis",
        "Hipertensión",
        "Angina de pecho",
        "Tuberculosis",
        "Enfermedades venéreas",
        "Gastritis",
        "Menopausia"
    ];

    return (
        <div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">
                <div className="space-y-4">
                    {leftColumnDiseases.map((name) => (
                        <DiseaseRow
                            key={name}
                            name={name}
                            disease={diseases[name]}
                            onChange={onChange}
                        />
                    ))}
                </div>

                <div className="space-y-4">
                    {rightColumnDiseases.map((name) => (
                        <DiseaseRow
                            key={name}
                            name={name}
                            disease={diseases[name]}
                            onChange={onChange}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">OTROS, DESCRIBA CUALES:</h3>
                <Input
                    size="lg"
                    value={otherDiseases}
                    onChange={(e) => onOtherDiseasesChange(e.target.value)}
                    className="w-full"
                    classNames={{
                        base: "w-full",
                        input: "h-10",
                    }}
                />
            </div>
        </div>
    );
}