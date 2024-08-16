import React, { useEffect, useState } from 'react'
import Product from '../components/Product';

const AllProducts = () => {

    34556789

    const [products, setProducts] = useState([]);

    const [sortOrder, setSortOrder] = useState(null);

    const sortItems = (order) => {
        const sortedItems = [...products].sort((a, b) => {
            if (order === "lowToHigh") {
                return a.price - b.price;
            } else if (order === "highToLow") {
                return b.price - a.price;
            } else if (order === 'newestDate') {
                return new Date(b.product_creation_date_time) - new Date(a.product_creation_date_time);
            }
            return 0;
        })

        setProducts(sortedItems);
        setSortOrder(order);
    }

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [allProductsTotal, setAllProductsTotal] = useState("");
    const allProductsCount = allProductsTotal.totalProductsCount;

    useEffect(() => {
        fetch(`http://localhost:3000/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        fetch(`http://localhost:3000/totalProductsCount`)
            .then(res => res.json())
            .then(data => {
                setAllProductsTotal(data);
            })
    }, [])

    const numberOfPages = Math.ceil(allProductsCount / itemsPerPage);

    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i);
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    if (loading) {
        return <div className='flex items-center justify-center'>
            <div className="loading loading-infinity loading-lg min-h-screen "></div>
        </div>
    }

    return (
        <>

            <div className='flex items-center justify-center gap-5 mt-12'>
                <button className='btn btn-sm btn-primary' onClick={() => sortItems('lowToHigh')}>Price: Low to High</button>
                <button className='btn btn-sm btn-primary' onClick={() => sortItems('highToLow')}>Price: High to Low</button>
                <button className='btn btn-sm btn-primary' onClick={() => sortItems('newestDate')}>Sort by Date</button>
            </div>

            {/* search work */}
            <div className='my-[70px] w-5/12 mx-auto'>
                <form>
                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={(e) => setSearch(e.target.value)} type="text" className="grow" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </form>
            </div>

            <div className='flex items-center justify-center my-[70px]'>

                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-16'>
                    {
                        products?.filter((item) => {
                            if (search == "") {
                                return item;
                            } else if (item?.product_name?.toLowerCase().includes(search?.toLowerCase())) {
                                return item;
                            }
                        }).map(item => <Product key={item._id} item={item} />)
                    }
                </div>
            </div>


            {/* pagination */}
            <div className='flex items-center justify-center gap-2 mb-[50px]'>

                <button onClick={handlePrev} className='btn btn-sm'>Prev</button>

                {
                    pages?.map(page => <button onClick={() => setCurrentPage(page)} className={`btn btn-sm btn-neutral ${currentPage === page && "bg-blue-500 border-none"}`} key={page}>
                        {page}
                    </button>)
                }

                <button onClick={handleNext} className='btn btn-sm'>Next</button>

            </div>
        </>
    )
}

export default AllProducts
