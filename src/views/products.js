import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Dropdown} from 'react-bootstrap'

//components
import Menu from '../assets/components/MenuComponent/index.js'
import Product from '../assets/components/ProductComponent/index.js'


//services
import api from '../services/backend-api.js'




const BannerProduct = styled.img`
    display: absolute;  
    height: 654px;
`


const Title = styled.p`
  text-align: center;
  font-size: 28rem;
  color: var(--color-black-dark);
  background: var(--color-footer-gray);
  padding-left: 15px;
  padding-right: 15px;
  :hover{
    background: var(--color-base);
  }
`

const Item = styled.p`
  text-align: center;
  font-size: 23rem;
  color: var(--color-black-dark);
  padding-left: 15px;
  padding-right: 15px;
  :hover{
    background: var(--color-footer-gray);
  }
`

const CategoryName = styled.p`
  text-align: left;
  font-size: 28rem;
  color: var(--color-black-dark);
  width: 200px;
  border-bottom: 1px solid var(--color-footer-gray);
  margin-bottom: 30px;
`
const CategoryMenu = styled.header`
    width: 1400px;
    margin: auto;
    justify-content: space-between;
    background:var(--color-footer-gray);
`
const ListProduct = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 1400px;
    margin: auto;

`

const Container = styled.div`
    width: 1400px;
    background: var(--color-gray-light);
    margin: auto; 
    
    
`

function Products(props) {

    const [categories, setCategories] = useState([])

    const [products, setProducts] = useState([])

    const [category, setCategory] = useState([-1])

    const [categoryName, setCategoryName] = useState(['Todos'])

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
        if(category == -1){
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
        <>
        <Container>
            <Menu/>
            <BannerProduct src="https://www.dafc.com.vn/website/var/tmp/image-thumbnails/0/4547/thumb__bannerAbout/banner.jpeg"/>
            <CategoryMenu>
                <Dropdown >
                    <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                        <Title>Categorias</Title>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {categories.map(item=>(
                                        <Item key = {item.id} onClick={()=>{
                                            setCategory(item.id);
                                            setCategoryName(item.name);
                                        }}>
                                        {item.name}
                                        </Item>
                                    ))}
                    </Dropdown.Menu>
                </Dropdown>
            </CategoryMenu>
        </Container>   

        <Container>
            <CategoryName>
                {categoryName}
            </CategoryName>
            <ListProduct>
                {products.map(product =>(
                    <Product key={product.id} name={product.name} imgUrl={product.imgUrl} />
                ))}
            </ListProduct>
        </Container>
                    
        </>
    )
}


export default Products;