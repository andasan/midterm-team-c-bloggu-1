import React from "react";
import "./Navigation.scss";

const categoriesArr = ["Lifestyle","Food","Travel","Movie","Photography","Social Media","Pets","Technology","Fashion","Beauty"];
const categories = categoriesArr.map(cat => (
    <div className="category" key={cat}><a href={`/category/${cat}`}>{cat}</a></div>
));

const Navigation =() =>{
    return(
        <div className="nav_wrapper">
            {categories}
        </div>
    );
}

export default Navigation;