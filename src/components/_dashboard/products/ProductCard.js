import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Icon } from '@iconify/react';
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import buyIcon from '@iconify/icons-icons8/buy';

import { Button} from '@material-ui/core';
import Label from '../../Label';

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

export default function ShopProductCard({ product }) {
  const { name, cover, price} = product;

  return (
    <Card>
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
          >
            Buy
          </Button>
        </Stack>
        </Stack>
      
      </Stack>
    </Card>
  );
}
