import Button from "common/components/button/button";
import Input from "common/components/inputs/input";
import InputSearchPlace from "common/components/inputs/input_search_place";
import Select from "common/components/inputs/select";
import { IFilter, IPrice } from "models/IOfferModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainApiService, ordersApiService } from "services/api.service";
import Calendar from "react-calendar";
import File from "common/components/button/file";

interface Data {
    categories: IFilter[];
    brands: IFilter[];
    projects: IFilter[]
    currencies: IFilter[];
    prices: IPrice;
    regions: IFilter[];
}

interface State {
    category: string;
    brand: string;
    status: string;
    address: string;
    currency: string;
    price: string;
    geo_lat: string,
    geo_long: string,
    region_id: string;
    project_id: string;
    description: string;
    date: any;
    files: File[];
    removeAllFiles: boolean;
}

export default function CreateOrder() {
    const navigate = useNavigate();
    const status = ["New", "Active", "Hidden", "Rejected"];

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data>({
        categories: [],
        brands: [],
        projects: [],
        currencies: [],
        regions: [],
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
        project_id: "1",
        address: "",
        currency: "",
        price: "",
        status: "",
        region_id: "",
        geo_lat: "49.6921198",
        geo_long: "24.3570757",
        description: "",
        date: new Date(),
        files: [],
        removeAllFiles: true
    });

    useEffect(() => {
        const fetchData = async () => {
            const categories = await mainApiService.getAllCategories();
            const brands = await mainApiService.getAllBrands();
            const projects = await mainApiService.getAllProjects();
            const currencies = await mainApiService.getAllCurrencies();
            const regions = await mainApiService.getAllRegions();


            return {
                categories,
                brands,
                projects,
                currencies,
                prices: data.prices,
                regions
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


    const createOrder = async () => {
        setLoading(true);
        const formData = new FormData();

        const dateFrom = Array.isArray(state.date) ? state.date[0] : state.date;
        const dateTo = Array.isArray(state.date) ? (state.date.length == 2 ? state.date[1] : state.date[0]) : state.date;

        formData.append("category_id", state.category);
        formData.append("date_from", dateFrom.toISOString().split('T')[0]);
        formData.append("date_to", dateTo.toISOString().split('T')[0]);
        formData.append("geo_lat", state.geo_lat);
        formData.append("geo_long", state.geo_long);
        formData.append("currency_id", state.currency);
        formData.append("price", state.price);
        formData.append("region_id", "3");
        formData.append("project_id", state.project_id);
        formData.append("status_id", state.status);
        formData.append("client_id", "1");
        formData.append("address", state.address);
        formData.append("description", state.description);

        if (state.files.length !== 0) {
            state.files.forEach((file, index) => {
                formData.append(`files${index}[file]`, file);
            });
        }

        await ordersApiService.createOrder(formData);
        setLoading(false);
        setState((prev) => ({
            ...prev,
            category: "",
            brand: "",
            project_id: "1",
            address: "",
            currency: "",
            price: "",
            status: "",
            region_id: "",
            geo_lat: "49.6921198",
            geo_long: "24.3570757",
            removeAllFiles: true,
            description: "",
            date: new Date(),
            files: []
        }));
    }

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
                        name="brand"
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
                        defaultValue={state.project_id}
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
                        name="price"
                        value={state.price}
                        onChange={(e) => {
                            if (isNaN(Number(e.target.value))) return;
                            setState((prev) => ({
                                ...prev,
                                price: e.target.value
                            }));
                        }}
                        label="Price"
                        wrapperClassName="w-full"
                    />
                    <Select
                        defaultValue={state.region_id}
                        name="region"
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, region_id: e.target.value }));
                        }}
                        label="Region"
                        className="!items-start w-full"
                    >
                        {data.regions.map((c, index) => (
                            <option key={index} value={c.value}>
                                {c.text}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="flex w-full gap-3 items-center">
                    {/* <Input
                        name="address"
                        value={state.address}
                        onChange={(e) => {
                            setState((prev) => ({ ...prev, address: e.target.value }));
                        }}
                        label="Address"
                        wrapperClassName="w-full"
                    /> */}
                    <InputSearchPlace
                        onChange={(e) => {
                            console.log(e.target.value)
                            if (e.target.value.geo_lat) {
                                setState((prev) => ({ ...prev, geo_lat: e.target.value.geo_lat, geo_long: e.target.value.geo_long, address: e.target.value.description }));
                            } else {
                                setState((prev) => ({ ...prev, address: e.target.value }));
                            }
                        }}
                        onClick={(info) => {
                            console.log(info)
                        }}
                        value={state.address}
                        name="address"
                        label="Address"

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


                <div className="flex items-center gap-3 h-[320px]">
                    <div className="relative">
                        <Calendar
                            locale="en-EN"
                            onClickDay={(d) => {
                                if (state.date.length === 2) {
                                    setState((prev) => ({ ...prev, date: [d] }));
                                } else if (
                                    state.date.length === 1 &&
                                    (new Date(state.date[0]).toDateString() ||
                                        new Date(state.date[1]).toDateString()) !== d.toDateString()
                                ) {
                                    setState((prev) => ({ ...prev, date: [d] }));
                                }
                            }}
                            onChange={(e) => {
                                setState((prev) => ({ ...prev, date: Array.isArray(e) ? e : [e] }));
                            }}
                            selectRange={true}
                            value={state.date as [Date, Date]}
                            showNeighboringMonth={false}
                            className={`w-1/2 min-w-[380px] user-select-none !shadow-none`}
                            onViewChange={(e) => {
                                console.log(e);
                            }}
                            tileContent={({ date }) => {
                                if (
                                    new Date(state.date[0]).toDateString() ===
                                    new Date(date).toDateString()
                                ) {
                                    return (
                                        <div className="bg-[#1d4354] absolute w-[40px] h-[40px] text-white flex justify-center items-center rounded-full">
                                            {date.getDate()}
                                        </div>
                                    );
                                } else if (
                                    new Date(state.date[1]).toDateString() ===
                                    new Date(date).toDateString()
                                ) {
                                    return (
                                        <div className="bg-[#1d4354] absolute w-[40px] h-[40px] text-white flex justify-center items-center rounded-full border-[2px] border-[#1d4354]">
                                            {date.getDate()}
                                        </div>
                                    );
                                } else if (
                                    new Date(state.date).toDateString() ===
                                    new Date(date).toDateString()
                                ) {
                                    return (
                                        <div className="bg-[#1d4354] absolute w-[40px] h-[40px] text-white flex justify-center items-center rounded-full">
                                            {date.getDate()}
                                        </div>
                                    );
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col w-full h-full">
                        <span className="text-[#5B6B79] text-[14px] mb-[8px]">Description</span>
                        <textarea name="description" className="flex w-full h-full p-6" value={state.description}
                            onChange={(e) => {
                                setState((prev) => ({ ...prev, description: e.target.value }));
                            }}
                        ></textarea>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center">
                    <File
                        onFileUpload={(file) => {
                            setState((prev) => ({ ...prev, files: [...prev.files, file], removeAllFiles: false }));
                        }}
                        onRemoveFile={(index) => {
                            setState((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
                        }}
                        removeAllFiles={state.removeAllFiles}
                    />
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
                        onClick={createOrder}
                        disabled={loading}
                    >
                        {loading && <div className={`loader w-[20px] h-[20px] mr-3`}></div>} <span>Save</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
