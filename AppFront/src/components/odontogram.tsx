import { useState } from "react"
import { Tooth } from "./tooth"
import { ControlPanel } from "@/components/control-panel"
import { ToothData } from "../types/tooth"
import { initialTeethData } from "../utils/teeth-data"

export function Odontogram() {
    const [teeth, setTeeth] = useState<ToothData[]>(initialTeethData)
    const [selectedToothId, setSelectedToothId] = useState<string | null>(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const selectedTooth = teeth.find((tooth) => tooth.id === selectedToothId) || null

    const handleToothUpdate = (toothId: string, updates: Partial<ToothData['conditions']>) => {
        setTeeth((currentTeeth) =>
            currentTeeth.map((tooth) =>
                tooth.id === toothId
                    ? { ...tooth, conditions: { ...tooth.conditions, ...updates } }
                    : tooth
            )
        )
    }

    const handleToothClick = (toothId: string) => {
        if (selectedToothId === toothId) {
            setSelectedToothId(null)
            setIsSidebarOpen(false)
        } else {
            setSelectedToothId(toothId)
            setIsSidebarOpen(true)
        }
    }

    const upperTeeth = teeth.filter((tooth) => tooth.position === "upper")
    const lowerTeeth = teeth.filter((tooth) => tooth.position === "lower")

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Odontograma</h2>
            <div className="space-y-8">
                {/* Upper teeth */}
                <div className="flex justify-center space-x-1">
                    {upperTeeth.map((tooth) => (
                        <Tooth
                            key={tooth.id}
                            tooth={tooth}
                            isSelected={tooth.id === selectedToothId}
                            onClick={() => handleToothClick(tooth.id)}
                        />
                    ))}
                </div>

                {/* Lower teeth */}
                <div className="flex justify-center space-x-1">
                    {lowerTeeth.map((tooth) => (
                        <Tooth
                            key={tooth.id}
                            tooth={tooth}
                            isSelected={tooth.id === selectedToothId}
                            onClick={() => handleToothClick(tooth.id)}
                        />
                    ))}
                </div>
            </div>

            <ControlPanel
                selectedTooth={selectedTooth}
                onUpdateTooth={handleToothUpdate}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    )
}