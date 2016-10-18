package com.icss.lighttower.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.icss.lighttower.util.RemoteServer;

public class ResposeServlet extends HttpServlet
{

    private static final String SERVER_URL = "http://10.100.8.30:8888";//"http://10.100.66.102:8080";// 
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private RemoteServer remoteServer;

    @Override
    public void init() throws ServletException
    {
        remoteServer = new RemoteServer();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=UTF-8");
        String url = generateURL(req);
        String responseContent = remoteServer.doGet(url);
        resp.getWriter().println(responseContent);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=UTF-8");
        String url = generateURL(req);
        System.out.println(req.getParameter("userId"));
        Map<String, String[]> paramsMap = req.getParameterMap();
        String responseContent = remoteServer.doPost(url,paramsMap);
        resp.setStatus(200);
        resp.getWriter().println(responseContent);
    }

    private String generateURL(HttpServletRequest req)
    {
        String query = req.getQueryString();
        String url = req.getRequestURI().replace(req.getContextPath(), "");
        url = SERVER_URL + url.replaceFirst("/restful/", "/");
        if (!"".equals(query) && null != query)
        {
            url += "?" + query;
        }
        return url;
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=UTF-8");
        String url = generateURL(req);
        String responseContent = remoteServer.doDelete(url);
        resp.getWriter().println(responseContent);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=UTF-8");
        BufferedReader in = new BufferedReader(new InputStreamReader(req.getInputStream()));
        String line = "";
        line = in.readLine();
        in.close();
        Map<String, String> paramsMap = new HashMap<>();
        if (null != line)
        {
            String[] pairs = line.split("&");
            for (String pair : pairs)
            {
                String[] values = pair.split("=");
                paramsMap.put(values[0], values[1]);
            }
        }
        String responseContent = remoteServer.doPut(generateURL(req), paramsMap);
        resp.getWriter().println(responseContent);
    }
}
