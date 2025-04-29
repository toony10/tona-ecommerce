import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DropdownMenuProps {
    title: string,
    subTitle: string,
    options: string[]
}

export default function DropdownMenu({ title, subTitle, options }: DropdownMenuProps) {
    return (
        <Select>
            <SelectTrigger className="w-auto rounded-full">
                <SelectValue placeholder={ title } />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{ subTitle }</SelectLabel>
                    { options.map((option, index) => (
                        <SelectItem key={ index } value={ option }>{ option }</SelectItem>
                    )) }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
