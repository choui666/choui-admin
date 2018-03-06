import { EditService } from './edit.service';
import { IndexService } from './index.service';
import { UserService } from './user.service';
import { CanAdminProvide } from './guard';
/**
 * Created by admin on 2018/3/6.
 */

export  const  Services = [
    EditService,
    IndexService,
    UserService,
    CanAdminProvide
];