"use client";

import { Button, Form, Label, ListBox, Select } from "@heroui/react";
import { redirect } from "next/navigation";

export function SearchSection() {
    const searchHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const searchData = e.currentTarget.search.value;
        console.log(searchData, 'from search page');
        redirect(`/buyProduct?category=${searchData || ''}`)
    }
    return (
        <Form onSubmit={searchHandle} className="w-full sm:w-[50%] mx-auto  my-10">
            <Label className="text-gray-700 ml-2 mb-1">Filter by Category</Label>
            <div className="flex items-center gap-2">
                <Select name="search" className="w-full" placeholder="Select one">
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            <ListBox.Item id="" textValue="">
                                All Data
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="other" textValue="other">
                                Other
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="shoes" textValue="shoes">
                                Shoes
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="transport" textValue="transport">
                                Transport
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="utilities" textValue="utilities">
                                Utilities
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="rent" textValue="rent">
                                Rent
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="tshirt" textValue="tshirt">
                                T-shirt
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>
                <Button type="submit">Search</Button>
            </div>
        </Form>

    );
}