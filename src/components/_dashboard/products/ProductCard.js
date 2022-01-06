import {useState} from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Icon } from '@iconify/react';
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import buyIcon from '@iconify/icons-icons8/buy';

import { Button , TextField} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import {AddProductToCart} from '../../../APIcalls/Products';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

const InputNumStyle = {
  "& input[type=number]::-webkit-inner-spin-button,& input[type=number]::-webkit-outer-spin-button" : {"opacity" : "1"}
}

export default function ShopProductCard({ product }) {
  const { name, cover, id, price} = product;

  const [showProduct,setShowProduct] = useState(false);
  const [quantity,setQuantity] = useState(0);
  const handleClose = () => {
    setShowProduct(false);
  };

  const AddToCart = (event,productId,quantity) => {
    event.preventDefault();
    AddProductToCart(productId, quantity,2);
  }

  return (
    <Card>
       <Dialog open={showProduct} maxWidth="xs" fullWidth={true}>
       <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
              {price} $
            </Typography>
          </Typography>
          <Stack alignItems="center">
          <TextField 
              type="number"
              variant="outlined"
              width="md"
              onChange={(e) => setQuantity(e.target.value)}
              InputProps={{
                  inputProps: { 
                      max: "50",
                      min: "1" ,
                      step: "1"
                  }
              }}
              className={InputNumStyle}
              value={quantity}
              label="Quantity"
          />
          </Stack>
          <Stack alignItems="right" justifyContent="space-between">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            startIcon={<Icon icon={buyIcon} />}
            onClick={(e) => AddToCart(e,id,quantity)}
          >
            Add to Cart
          </Button>
          </Stack>
        </Stack>
          <Button color="error" onClick={handleClose}>Close</Button>
      </Stack>
       
      </Dialog>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
              {price} $
            </Typography>
          </Typography>
          <Stack alignItems="right" justifyContent="space-between">
          <Button
            type="button"
            variant="outlined"
            startIcon={<Icon icon={buyIcon} />}
            onClick={() => setShowProduct(true)}
          >
            Buy
          </Button>
          </Stack>
        </Stack>
      
      </Stack>
    </Card>
  );
}
