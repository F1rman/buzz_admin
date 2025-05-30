import Button from "common/components/button/button";
import Input from "common/components/inputs/input";
import Select from "common/components/inputs/select";
import { IFilter, IPrice } from "models/IOfferModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainApiService, offersApiService } from "services/api.service";

interface Data {
    categories: IFilter[];
    brands: IFilter[];
    projects: IFilter[]
    currencies: IFilter[];
    prices: IPrice;
    content: string;
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
    geo_lat: number;
    geo_long: number;
    content: string;
}

export default function CreateOffer() {
    const navigate = useNavigate();
    const status = ["New", "Active", "Hidden", "Rejected"];
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<Data>({
        categories: [],
        brands: [],
        projects: [],
        currencies: [],
        content: "",
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
        status: "",
        geo_lat: 49.6921198,
        geo_long: 24.3570757,
        content: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const categories = await mainApiService.getAllCategories();
            const brands = await mainApiService.getAllBrands();
            const projects = await mainApiService.getAllProjects();
            const currencies = await mainApiService.getAllCurrencies();


            return {
                categories,
                brands,
                projects,
                currencies,
                prices: data.prices,
                content: data.content
            }
        };

        fetchData().then((res) => {
            setData(res);
        });
    }, []);

    useEffect(() => {
        if (!!state.category) {
            mainApiService.getPricesByCategoryId(Number(state.category)).then((res) => {
                setState((prev) => ({ ...prev, prices: res.price_templates_default.map((p) => p.hours_from) }));
            });
        }
    }, [state.category]);
    console.log(state)


    const createOffer = async () => {
        const formData = new FormData();

        formData.append("address", state.address);
        formData.append("geo_lat", state.geo_lat.toString());
        formData.append("geo_long", state.geo_long.toString());
        formData.append("content", state.content);
        formData.append("category_id", state.category);
        formData.append("brand_id", state.brand);
        formData.append("region_id", "10");
        formData.append("status", "new");
        formData.append("prices[0][price]", state["prices[0][price]"].toString());
        formData.append("prices[0][hours_from]", "1");
        formData.append("prices[0][currency_id]", "2");
        formData.append("prices[1][price]", state["prices[1][price]"].toString());
        formData.append("prices[1][hours_from]", "8");
        formData.append("prices[1][currency_id]", "2");
        formData.append("projects[0]", "1");
        formData.append("tags[0]", "1");

        // const offerItem: IOfferItem = {
        //     id: 0, // Replace with actual id if available
        //     name: state.address, // Replace with the appropriate field
        //     alias: "", // Replace with the appropriate field
        //     status: state.status,
        //     category_id: Number(state.category),
        //     brand_id: Number(state.brand),
        //     region_id: 10,
        //     geo_lat: state.geo_lat,
        //     geo_long: state.geo_long,
        //     content: state.content,
        //     prices: [
        //         {
        //             price: state["prices[0][price]"],
        //             hours_from: state["prices[0][hours_from]"],
        //             currency_id: 2,
        //         },
        //         {
        //             price: state["prices[1][price]"],
        //             hours_from: state["prices[1][hours_from]"],
        //             currency_id: 2,
        //         },
        //     ],
        //     projects: [1], // Replace with actual project IDs
        //     tags: [1], // Replace with actual tag IDs
        // };

        await offersApiService.createOffer(formData)
    }
    console.log(state)
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
                    <textarea name="content" value={state.content} className="w-full !h-[200px] p-6"
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, content: e.target.value }));
                        }}
                    ></textarea>
                </div>
                <div className="flex w-full gap-3 items-center justify-end mt-3">
                    <Button
                        variant="cancel"
                        className="!w-[145px] !p-0 flex items-center justify-center text-left !font-light"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="auth"
                        className="!w-[145px] !p-0 flex items-center justify-center text-left text-white !font-light"
                        onClick={createOffer}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}
