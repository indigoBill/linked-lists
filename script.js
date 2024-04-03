const NewNode = function(value = null, nextNode = null){

    return { value, nextNode };
}

const LinkedList = function(){
    const list = {
        head: null,
    };

    function append(value){
        if(list['head'] === null){
            list['head'] = NewNode(value);
        }else{
            const nodeSuffix = Object.values(list).length;

            list[`node_${nodeSuffix}`] = NewNode(value);
            Object.values(list)[nodeSuffix-1]['nextNode'] = list[`node_${nodeSuffix}`];
        }

        return list;
    }

    function prepend(value){
        let nodeSuffix = 1;
        const length = Object.values(list).length;

        list['head'] = NewNode(value, list['head']);

        while(nodeSuffix <= length){
            if(nodeSuffix === 1){
                list[`node_${nodeSuffix}`] = list['head']['nextNode'];
            }else{
                list[`node_${nodeSuffix}`] = list[`node_${nodeSuffix - 1}`]['nextNode'];
            }
            
            nodeSuffix++;
        }

        return list;
    }

    function size(){
        let size = 0;

        for(const prop in list){
            size++;
        }

        return size;
    }

    function head(){
        return list['head'];
    }

    function tail(){
        const lastNodeSuffix = Object.values(list).length - 1;
    
        return list[`node_${lastNodeSuffix}`];
    }

    function at(index){
        if(index === 0){
            return list['head'];
        }

        return list[`node_${index}`];
    }

    function pop(){
        const lastNodeSuffix = Object.values(list).length - 1;

        delete list[`node_${lastNodeSuffix}`];
        list[`node_${lastNodeSuffix - 1}`]['nextNode'] = null;

        return list;
    }

    function contains(value){
        for(const prop in list){
            if (list[prop]['value'] === value) return true;
        }

        return false;
    }

    function find(value){
        for(const prop in list){
            if(list[prop]['value'] === value){
                if(prop === 'head') return 0;
                
                return prop.split('_')[1];
            }
        }

        return null;
    }

    function toString(){
        const str = ' ';
        let finalString = '';

        const arr = Object.values(list);

        arr.forEach((object, index) => {
            const value = object['value'];
            let outputString;

            if(index !== arr.length - 1){
                outputString = `( ${value} ) ->`;
            }else{
                outputString = `( ${value} ) -> null`;
            }

            finalString += str.concat(outputString);
        });

        return finalString;
    }

    function insertAt(value, index){
        const length = Object.values(list).length;

        if(index === 0){
            prepend(value);
        }else if(index >= length){
            append(value);
        }else{
            let nodeSuffix = index + 1;

            list[`node_${index}`] = NewNode(value, list[`node_${index}`]);

            if(index - 1 === 0){
                list['head']['nextNode'] = list[`node_${index}`];
            }else{
                list[`node_${index - 1}`]['nextNode'] = list[`node_${index}`];
            }

            while(nodeSuffix <= length){
                list[`node_${nodeSuffix}`] = list[`node_${nodeSuffix - 1}`]['nextNode'];
                nodeSuffix++;
            }
        }

        return list;
    }

    function removeAt(index){
        const length = Object.values(list).length;
        let nodeSuffix = 1;

        if(index === 0){
            list['head'] = list['head']['nextNode'];
        }else if(index === length - 1){
            pop();
            return;
        }else{
            list[`node_${index}`] = list[`node_${index}`]['nextNode'];

            if(index - 1 === 0){
                list['head']['nextNode'] = list[`node_${index}`];
            }else{
                list[`node_${index - 1}`]['nextNode'] = list[`node_${index}`];
            }

            nodeSuffix = index + 1;
        }

        while(nodeSuffix < length){
            if(nodeSuffix !== length - 1){
                list[`node_${nodeSuffix}`] = list[`node_${nodeSuffix}`]['nextNode'];
            }else{
                delete list[`node_${nodeSuffix}`];
            }

            nodeSuffix++;
        }

        return list;
    }

    return { append, prepend, size, head, tail, at, pop, contains, find, toString, insertAt, removeAt };
}
