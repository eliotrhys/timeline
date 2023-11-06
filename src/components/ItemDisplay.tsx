import DotItem from "@/app/types/DotItem"

interface ItemDisplayProps {
    selectedDotItem: DotItem
}

export default function ItemDisplay(props: ItemDisplayProps) {

    if (!props.selectedDotItem) {
        return null; // or display a loading message or handle the undefined case as needed
    }

    return (
        <div className="container mx-auto px-4">
            <div className="inline-block bg-slate-100 rounded-sm p-2">
                <div className="flex">

                    <div className="mr-4">
                        <img src={props.selectedDotItem.imageSrc ? props.selectedDotItem.imageSrc : ""} className="h-40 rounded-sm" alt="" />
                    </div>

                    <div>
                        <time className="block text-slate-500 text-sm">{props.selectedDotItem.date.toLocaleDateString()}</time>
                        <p className="block mb-2">{props.selectedDotItem.text}</p>

                    </div>

                </div>

            </div>

      </div>
    )
}