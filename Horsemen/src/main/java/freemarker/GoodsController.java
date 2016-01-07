/*
 * Copyright 2012-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package freemarker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Stream;

@Controller
public class GoodsController {

    List<Good> goods = new ArrayList();

    {
        goods.add(new Good("洗衣粉", "36", "推荐❤❤❤", 0));
        goods.add(new Good("洗衣机", "3600", "推荐❤❤❤❤❤", 1));
        goods.add(new Good("手机", "1600", "推荐❤❤❤❤", 2));
        goods.add(new Good("搓衣板", "36", "推荐❤❤", 3));
    }

    @RequestMapping(value = "/goods", method = RequestMethod.GET)
    @ResponseBody
    public List get(final Good good) {
        final Stream<Good> goodStream = goods.stream().filter(new Predicate<Good>() {
            public boolean test(Good g) {
                boolean isOK = true;
                if (good.getName() != null && good.getName() != "") {
                    if (!g.getName().equals(good.getName()))
                        isOK = false;
                }
                if (good.getPrice() != null && good.getPrice() != "") {
                    if (!g.getPrice().equals(good.getPrice()))
                        isOK = false;
                }
                if (good.getRecommend() != null && good.getRecommend() != "") {
                    if (!g.getRecommend().equals(good.getRecommend()))
                        isOK = false;
                }
                return isOK;
            }
        });
        return Arrays.asList( goodStream.toArray());
    }

    @RequestMapping(value = "/goods/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Good getOne(@PathVariable("id") Integer id) {
        return goods.get(id.intValue());
    }

    @RequestMapping(value = "/goods/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public List<Good> delete(@PathVariable("id") Integer id) {
        goods.remove(id.intValue());
        return goods;
    }

    @RequestMapping(value = "/goods", method = RequestMethod.PUT)
    @ResponseBody
    public List<Good> put(@RequestBody Good good) {
        goods.add(good);
        return goods;
    }

    @RequestMapping(value = "/goods/{id}", method = RequestMethod.POST)
    @ResponseBody
    public List<Good> post(@PathVariable("id") Integer id, @RequestBody Good good) {
        goods.add(id.intValue(), good);
        return goods;
    }


}
