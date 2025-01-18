import Button from "common/components/button/button";
import Input from "common/components/inputs/input";
import Select from "common/components/inputs/select";
import { IFilter, IPrice } from "models/IOfferModel";
import { useEffect, useState } from "react";
import { offersApiService } from "services/api.service";

interface Data {
    categories: IFilter[];
    brands: IFilter[];
    projects: IFilter[]
    currencies: IFilter[];
    prices: IPrice;
}

interface State {
    category: string;
    brand: string;
    status: string;
    project: string;
    address: string;
    currency: string;
    "prices[0][price]": number;
    "prices[1][price]": number;
    "prices[1][currency_id]": number;
    "prices[0][hours_from]": number;
    "prices[1][hours_from]": number;
}

export default function CreateOffer() {
    const status = ["New", "Active", "Hidden", "Rejected"];
    const [data, setData] = useState<Data>({
        categories: [],
        brands: [],
        projects: [],
        currencies: [],
        prices: {
            "id": 1,
            "min_hour_price": 122,
            "currency_id": 1,
            "price_templates": [],
            "price_templates_default": [
                {
                    "hours_from": 1
                },
                {
                    "hours_from": 8
                }
            ]
        }
    });

    const [state, setState] = useState<State>({
        category: "",
        brand: "",
        project: "",
        address: "",
        "prices[0][hours_from]": 1,
        "prices[1][hours_from]": 8,
        "prices[0][price]": 0,
        "prices[1][price]": 0,
        currency: "",
        "prices[1][currency_id]": 0,
        status: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const categories = await offersApiService.getAllCategories();
            const brands = await offersApiService.getAllBrands();
            const projects = await offersApiService.getAllProjects();
            const currencies = await offersApiService.getAllCurrencies();


            return {
                categories,
                brands,
                projects,
                currencies,
                prices: data.prices
            }
        };

        fetchData().then((res) => {
            setData(res);
        });
    }, []);

    useEffect(() => {
        if (!!state.category) {
            offersApiService.getPricesByCategoryId(Number(state.category)).then((res) => {
                setState((prev) => ({ ...prev, prices: res.price_templates_default.map((p) => p.hours_from) }));
            });
        }
    }, [state.category]);
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-3 w-max min-w-[1200px] px-4 py-3">
                <div className="flex w-full gap-3 items-center">
                    <Select
                        name="category"
                        defaultValue={state.category}
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, category: e.target.value }));
                        }}
                        label="Category"
                        className="!items-start"
                    >
                        {data.categories.map((c, index) => (
                            <option key={index} value={c.value}>
                                {c.text}
                            </option>
                        ))}
                    </Select>
                    <Select
                        name="category"
                        defaultValue={state.brand}
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, brand: e.target.value }));
                        }}
                        label="Brand"
                        className="!items-start"
                    >
                        {data.brands.map((c, index) => (
                            <option key={index} value={c.value}>
                                {c.text}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="flex w-full gap-3 items-center">
                    <Select
                        name="currency"
                        defaultValue={state.currency}
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, currency: e.target.value }));
                        }}
                        label="Сurrency"
                        className="!items-start"
                    >
                        {data.currencies.map((c, index) => (
                            <option key={index} value={c.value}>
                                {c.text}
                            </option>
                        ))}
                    </Select>
                    <Select
                        name="project"
                        defaultValue={state.project}
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, project: e.target.value }));
                        }}
                        label="Projects"
                        className="!items-start"
                    >
                        {data.projects.map((c, index) => (
                            <option key={index} value={c.value}>
                                {c.text}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="flex w-full gap-3 items-center">
                    <Input
                        name="price1"
                        value={String(state["prices[0][price]"])}
                        onChange={(e) => {
                            if (isNaN(Number(e.target.value))) return;
                            setState((prev) => ({
                                ...prev,
                                "prices[0][price]": Number(e.target.value)
                            }));
                        }}
                        label="Price per hour for 1h"
                        wrapperClassName="w-full"
                    />
                    <Input
                        name="price2"
                        value={String(state["prices[1][price]"])}
                        onChange={(e) => {
                            if (isNaN(Number(e.target.value))) return;
                            setState((prev) => ({
                                ...prev,
                                "prices[1][price]": Number(e.target.value)
                            }));
                        }}
                        label="Price per hour for 8h"
                        wrapperClassName="w-full"
                    />
                </div>
                <div className="flex w-full gap-3 items-center">
                    <Input
                        name="address"
                        value={state.address}
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, address: e.target.value }));
                        }}
                        label="Address"
                        wrapperClassName="w-full"
                    />
                    <Select
                        defaultValue={status[0]}
                        name="status"
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, status: e.target.value }));
                        }}
                        label="Status"
                        className="!items-start"
                    >
                        {status.map((c, index) => (
                            <option key={index} value={c.toLocaleLowerCase()}>
                                {c}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-[#5B6B79] text-[14px] mb-[8px]">Description</span>
                    <textarea name="" className="w-full !h-[200px] p-6"></textarea>
                </div>
                <div className="flex w-full gap-3 items-center justify-end mt-3">
                    <Button
                        variant="cancel"
                        className="!w-[145px] !p-0 flex items-center justify-center text-left !font-light"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="auth"
                        className="!w-[145px] !p-0 flex items-center justify-center text-left text-white !font-light"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}
