app.filter('search', ()=>{
    return (input, filters)=>{
        var output = [],
            criteria_fulfilment,
            element,
            filter;
        for(let i in input) {
            element = input[i];
            criteria_fulfilment = true;
            for(let j in filters) {
                filter = filters[j];
                if (typeof filter !== 'undefined' && element[j] !== filter) {
                    criteria_fulfilment = false;
                    break;
                }
            };

            if(criteria_fulfilment){
                output.push(element);
            }
        };
        return output;
    };
});