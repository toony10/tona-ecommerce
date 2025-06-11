import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';

interface DropdownMenuProps {
    title: string,
    subTitle: string,
    options: string[]
}

export default function DropdownMenu({ title, subTitle, options }: DropdownMenuProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (selected: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (selected && selected !== 'all') {
            params.set('category', selected);
        } else {
            params.delete('category');
        }
        router.push(`?${ params.toString() }`, { scroll: false });
    };

    return (
        <Select onValueChange={ handleChange } defaultValue={ searchParams.get('category') || 'all' }>
            <SelectTrigger className="w-auto rounded-full">
                <SelectValue placeholder={ title } />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{ subTitle }</SelectLabel>
                    <SelectItem value="all">All categories</SelectItem>
                    { options.map((option, index) => (
                        <SelectItem key={ index } value={ option }>{ option }</SelectItem>
                    )) }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
