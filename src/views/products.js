import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

//components
import ProductsList from '../assets/components/ListsComponents/ProductsList.js'
import Menu from '../assets/components/MenuComponent/index.js'
import Product from '../assets/components/ProductComponent/index.js'
import {Base, Ul,Li,Texto} from '../assets/components/MenuComponent/styled.js'


//services

import api from '../services/backend-api.js'

const BaseCategoryMenu = styled.div`
    width: 1000px;
    margin: auto;
    background: #ffffff;
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
        <Container>
        <BaseCategoryMenu>
                <nav>
                    <Ul>
                        {categories.map(item=>(
                            <Li key = {item.id} onClick={()=>{
                                setCategory(item.id);
                            }}>
                                <Texto>{item.name}</Texto>
                            </Li>
                        ))}
                    </Ul>
                </nav>
            </BaseCategoryMenu>
        </Container>
        <Container>
            <Title>Produtos</Title>
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