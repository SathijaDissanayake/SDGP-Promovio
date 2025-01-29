// import '../styles/currentpage.css';
//
// export default function CurrentPage() {
//     return (
//         <div className="currentPageContainer">
//             <div className="currentPageHeader">
//                 <div className="title">
//                     <h2>CRM</h2>
//                 </div>
//                 <div className="tabs">
//                     <button className="tab active">Business</button>
//                     <button className="tab">Institution</button>
//                 </div>
//                 <div className="header-search">
//                     <input type="text" placeholder="Search..." className="search-input"/>
//                     <button className="search-button">Search</button>
//                     <button className="search-customers">Search Customers</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import '../styles/currentpage.css';

export default function CurrentPage() {
    return (
        <div className="currentPageContainer">
            <div className="currentPageHeader">
                <div className="header-left">
                    <div className="title">
                        <h2>CRM</h2>
                    </div>
                    <div className="tabs">
                        <button className="tab active">Business</button>
                        <button className="tab">Institution</button>
                    </div>
                </div>

                <div className="header-search">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-button">Search</button>
                    <button className="search-customers">Search Customers</button>
                </div>
            </div>
        </div>
    );
}

