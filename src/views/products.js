import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

//components
import Menu from '../assets/components/MenuComponent/index.js'
import Product from '../assets/components/ProductComponent/index.js'


//services

import api from '../services/backend-api.js'

const ItemCategory = styled.li`
    float: left;
    font-size: 18rem;
    text-align: center;
    padding: 15px 20px;
    border: 1px solid var(--color-footer-gray);
    :hover{
        background: var(--color-footer-gray);
    }
`

const ListCategory = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    
`

const BaseCategoryMenu = styled.div`
    width: 1400px;
    margin: auto;
    justify-content: left;
`

const Title = styled.p`
  font-size: 23rem;
  color: --color-footer-gray;
  margin-bottom: 15px;
`

const ListProduct = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 1400px;
    margin: auto;

`

const Container = styled.div`
    width: 1600px; 
    background: var(--color-gray-light);
    margin: auto; 
    
    ${Title}{
        margin-left: 100px;
    }
`

function Products(props) {

    const [categories, setCategories] = useState([])

    const [products, setProducts] = useState([])

    const [category, setCategory] = useState(['-1'])

    async function loadCategories() {
        const response = await api.get('categories')
          console.log(response.data)
          var list = response.data;
          list.push({'id': -1, 'name': 'Todos'})
          setCategories(list);
    
      }

      async function loadProductCategory() {
        const response = await api.get('categories/' + category,)
    
        var list = response.data;
        console.log('64', list);
        setProducts(list);
      }

    useEffect(() =>{
        loadCategories();
        if(category == '-1'){
            async function loadProducts() {
                const response = await api.get('products')
             
                var list = response.data;
                console.log('92', list);
                setProducts(list);
              }
              loadProducts()
        }else{
            loadProductCategory();
        }
    }, [category]);




    return (
        <Container>
        <Container>
            <Menu/>
        </Container>
        <BaseCategoryMenu>
                    <ListCategory>
                        {categories.map(item=>(
                            <ItemCategory key = {item.id} onClick={()=>{
                                setCategory(item.id);
                            }}>
                               {item.name}
                            </ItemCategory>
                        ))}
                    </ListCategory>
            </BaseCategoryMenu>
        <Container>
        
        </Container>

        <Container>
            <ListProduct>
            {products.map(product =>(
                <Product key={product.id} name={product.name} imgUrl={product.imgUrl} />
            ))}
            </ListProduct>
        </Container>
                    
        </Container>
    )
}


export default Products;