package com.icss.lighttower.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * HttpClient工具类
 * 
 * @author Administrator
 *
 */
public class RemoteServer
{
    public void init()
    {
    }

    /**
     * httpclient请求
     * 
     * @param request
     *            get/put/delete/post的基类
     * @return 服务器的响应值
     */
    private String doRequest(HttpUriRequest request)
    {
        String responseContent = null;
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try
        {
            // 执行请求.
            CloseableHttpResponse response = httpclient.execute(request);
            try
            {
                // 获取响应实体
                HttpEntity entity = response.getEntity();
                System.out.println("--------------------------------------");
                // 打印响应状态
                System.out.println(response.getStatusLine());
                if (entity != null)
                {
                    // 打印响应内容长度
                    System.out.println("Response content length: " + entity.getContentLength());
                    // 打印响应内容
                    responseContent = EntityUtils.toString(entity);
                    System.out.println("Response content: " + responseContent);
                }
                System.out.println("------------------------------------");
            }
            finally
            {
                response.close();
            }
        }
        catch (IOException | ParseException e)
        {
            e.printStackTrace();
        }
        finally
        {
            // 关闭连接,释放资源
            try
            {
                httpclient.close();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
        return responseContent;
    }

    /**
     * 获取数据
     * 
     * @param url
     *            获取地址
     * @return 服务器响应值
     * @throws IOException
     *             httpclient异常
     */
    public String doGet(String url) throws IOException
    {
        HttpGet httpGet = new HttpGet(url);
        return doRequest(httpGet);
    }

    /**
     * 添加数据
     * 
     * @param url
     *            添加地址
     * @param values
     *            添加的数据
     * @return 服务器响应值
     * @throws IOException
     *             httpclient异常
     */
    public String doPost(String url, Map<String, String[]> values) throws IOException
    {
        // 创建httpPost
        HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader("Content-Type", "application/json;charset=UTF-8");
        // 创建参数队列
        List<BasicNameValuePair> formparams = new ArrayList<BasicNameValuePair>();
        map2PostValue(values, formparams);
        UrlEncodedFormEntity uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
        uefEntity.setContentType("application/json;charset=UTF-8");
        httpPost.setEntity(uefEntity);
        return doRequest(httpPost);
    }

    /**
     * 删除数据
     * 
     * @param url
     *            删除地址
     * @param values
     *            删除的数据
     * @return 服务器响应值
     * @throws IOException
     *             httpclient异常
     */
    public String doDelete(String url) throws IOException
    {
        // 创建httpget.
        HttpDelete httpDelete = new HttpDelete(url);
        httpDelete.setHeader("Content-Type", "application/json;charset=UTF-8");
        return doRequest(httpDelete);
    }

    /**
     * 更新数据
     * 
     * @param url
     *            更新地址
     * @param values
     *            更新的数据
     * @return 服务器响应值
     * @throws IOException
     *             httpclient异常
     */
    public String doPut(String url, Map<String, String> values) throws IOException
    {
        HttpPut httpPut = new HttpPut(url);
        httpPut.setHeader("Content-Type", "application/json;charset=UTF-8");
        // 创建参数队列
        List<BasicNameValuePair> formparams = new ArrayList<BasicNameValuePair>();
        map2PutValue(values, formparams);
        UrlEncodedFormEntity uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
        httpPut.setEntity(uefEntity);
        return doRequest(httpPut);
    }

    /**
     * put方式的请求参数map转换httpclient键值对
     * 
     * @param map
     *            请求参数map
     * @param formparams
     *            httpclient键值对
     */
    private void map2PutValue(Map<String, String> map, List<BasicNameValuePair> formparams)
    {
        Set<String> set = map.keySet();
        Iterator<String> it = set.iterator();
        while (it.hasNext())
        {
            String key = it.next();
            formparams.add(new BasicNameValuePair(key, map.get(key)));
        }
    }

    /**
     * post方式的请求参数map转换httpclient键值对
     * 
     * @param map
     *            请求参数map
     * @param formparams
     *            httpclient键值对
     */
    private void map2PostValue(Map<String, String[]> map, List<BasicNameValuePair> formparams)
    {
        Set<String> set = map.keySet();
        Iterator<String> it = set.iterator();
        while (it.hasNext())
        {
            String key = it.next();
            formparams.add(new BasicNameValuePair(key, map.get(key)[0]));
        }
    }

    public static void main(String[] args) throws IOException
    {
        RemoteServer app = new RemoteServer();
        String content = app.doGet("http://10.100.8.30:8888/lighttower/api/v1/users?limit=20&offset=0");
        System.out.println(content);
    }
}
